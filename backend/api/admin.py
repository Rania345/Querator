from django.contrib import admin

# import the model Query
from .models import Query

# create a class for the admin-model integration
class QueryAdmin(admin.ModelAdmin):

	# add the fields of the model here
	list_display = ("title","question")

# we will need to register the
# model class and the Admin model class
# using the register() method
# of admin.site class
admin.site.register(Query,QueryAdmin)
