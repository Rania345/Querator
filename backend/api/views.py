from django.shortcuts import render

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
