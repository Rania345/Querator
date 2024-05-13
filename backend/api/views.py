from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
# import view sets from the REST framework
from rest_framework import viewsets

# import the QuerySerializer from the serializer file
from .serializers import QuerySerializer

# import the Query model from the models file
from .models import Query

# create a class for the Query model viewsets
class QueryView(viewsets.ModelViewSet):

	# create a serializer class and 
	# assign it to the QuerySerializer class
	serializer_class = QuerySerializer

	# define a variable and populate it 
	# with the Query list objects
	queryset = Query.objects.all()
      

# handle questions	
def get_answer(prompt): 
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
    response = "chatgpt response"
    print(response) 
    return response 

def answer(request):
    if request.method == 'POST':
        data =  {
            "brand": "Ford",
            "model": "Mustang",
            "year": 1964
        }
        return JsonResponse(data)
    else:
        return HttpResponse(status=500)