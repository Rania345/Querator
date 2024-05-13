from django.db import models

class Query(models.Model):
	title=models.CharField(max_length=150)
	question=models.CharField(max_length=500)

	# string representation of the class
	def __str__(self):

		#it will return the title
		return self.title 
