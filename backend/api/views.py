from django.http import HttpResponse
from django.db import connection
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
import json

# import the QuerySerializer from the serializer file
from .serializers import QuerySerializer

# import the Query model from the models file
from .models import Query, Customer


# create a class for the Query model viewsets
class QueryView(viewsets.ModelViewSet):
    # create a serializer class and
    # assign it to the QuerySerializer class
    serializer_class = QuerySerializer

    # define a variable and populate it
    # with the Query list objects
    queryset = Query.objects.all()


# handle questions	
def generate_sql_query(prompt):
    print(prompt)
    # query = openai.Completion.create( 
    #     engine="text-davinci-003", 
    #     prompt=prompt, 
    #     max_tokens=1024, 
    #     n=1, 
    #     stop=None, 
    #     temperature=0.5, 
    # ) 

    # response = query.choices[0].text 
    response = """
    SELECT AVG(total_order_value) AS average_order_value
    FROM (
        SELECT o.id AS order_id, SUM(od.quantity * p.unit_price) AS total_order_value
        FROM orders o
        JOIN order_details od ON o.id = od.order_id
        JOIN products p ON od.product_id = p.id
        GROUP BY o.id
    ) AS order_values;
    """
    return response


@csrf_exempt
@require_http_methods(["POST"])
def answer_question(request):
    post_data = json.loads(request.body.decode("utf-8"))
    # data = {
    #     "question":
    #     # "id": 123,
    #     # # "question": "Ford",
    #     # "title": "Mustang"
    # }

    cursor = connection.cursor()
    query = generate_sql_query(post_data.get("question"))
    cursor.execute(query)
    # rows = cursor.fetchall()
    # columns = [i[0] for i in cursor.description]
    fields = [field_md[0] for field_md in cursor.description]
    result = [dict(zip(fields, row)) for row in cursor.fetchall()]
    json_object = json.dumps(result)
    return HttpResponse(json_object)
