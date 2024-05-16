# import serializers from the REST framework
from rest_framework import serializers

# import the query data model
from .models import Query


# create a serializer class
class QuerySerializer(serializers.ModelSerializer):
    # create a meta class
    class Meta:
        model = Query
        fields = ("id", "title", "question")

