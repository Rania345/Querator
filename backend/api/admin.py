from django.contrib import admin

# import the model Query
from .models import Customer, Order, OrderDetails, Product, Query


# create a class for the admin-model integration
class QueryAdmin(admin.ModelAdmin):
    # add the fields of the model here
    list_display = ("title", "question")


class CustomerAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "email", "phone")


#
class ProductAdmin(admin.ModelAdmin):
    list_display = ("product_name", "category", "unit_price", "stock")


class OrderAdmin(admin.ModelAdmin):
    list_display = ("customer_id", "order_time")


class OrderDetailsAdmin(admin.ModelAdmin):
    list_display = ("order_id", "product_id", "quantity")


# we will need to register the
# model class and the Admin model class
# using the register() method
# of admin.site class
admin.site.register(Query, QueryAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderDetails, OrderDetailsAdmin)
