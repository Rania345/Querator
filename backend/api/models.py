from django.db import models


class Query(models.Model):
    title = models.CharField(max_length=150)
    question = models.CharField(max_length=500)

    class Meta:
        db_table = 'queries'

    # string representation of the class
    def __str__(self):
        # it will return the title
        return self.title


class Order(models.Model):
    customer_id: models.IntegerField()
    order_time: models.DateTimeField()
    class Meta:
        db_table = 'orders'


class OrderDetails(models.Model):
    order_id: models.IntegerField()
    product_id: models.IntegerField()
    quantity: models.IntegerField()
    class Meta:
        db_table = 'order_details'


class Product(models.Model):
    product_name: models.CharField(max_length=50)
    category: models.CharField(max_length=50)
    unit_price: models.DecimalField(decimal_places=2)
    Stock: models.IntegerField()
    class Meta:
        db_table = 'products'


class Customers(models.Model):
    first_name: models.CharField(max_length=50)
    last_name: models.CharField(max_length=50)
    email: models.CharField(max_length=100)
    phone: models.CharField(max_length=20)

    class Meta:
        db_table = 'customers'
