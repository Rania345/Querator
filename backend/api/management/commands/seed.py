from datetime import datetime
from django.core.management.base import BaseCommand
from api.models import Product, Customer, Order, OrderDetails, Query
import logging

logger = logging.getLogger(__name__)

# python manage.py seed --mode=refresh

""" Clear all data and creates addresses """
MODE_REFRESH = 'refresh'

""" Clear all data and do not create any object """
MODE_CLEAR = 'clear'


class Command(BaseCommand):
    help = "seed database for testing and development."

    def add_arguments(self, parser):
        parser.add_argument('--mode', type=str, help="Mode")

    def handle(self, *args, **options):
        self.stdout.write('seeding data...')
        run_seed(self, options['mode'])
        self.stdout.write('done.')


def clear_data():
    """Deletes all the table data"""
    logger.info("Delete Address instances")
    Query.objects.all().delete()
    Customer.objects.all().delete()
    Product.objects.all().delete()
    Order.objects.all().delete()
    OrderDetails.objects.all().delete()


def seed_data():
    # Queries
    Query.objects.create(title="Best seller of the month", question="What was the best seller of the last month?")
    Query.objects.create(title="Best seller of the year", question="What was the best seller of the last year?")
    Query.objects.create(title="Top 10 sellers of the month",
                         question="What are the top 10 selling products of the last month?")
    # Customers
    customer1 = Customer.objects.create(first_name="John", last_name="Doe", email="john.doe@example.com",
                                        phone="123-456-7890")
    customer2 = Customer.objects.create(first_name="Jane", last_name="Smith", email="jane.smith@example.com",
                                        phone="987-654-3210")
    customer3 = Customer.objects.create(first_name="Alice", last_name="Johnson", email="alice.johnson@example.com",
                                        phone="555-123-4567")
    # Products
    product1 = Product.objects.create(product_name="Laptop", category="Electronics", unit_price=999.99, stock=100)
    product2 = Product.objects.create(product_name="Smartphone", category="Electronics", unit_price=499.99, stock=150)
    product3 = Product.objects.create(product_name="Headphones", category="Electronics", unit_price=99.99, stock=200)
    product4 = Product.objects.create(product_name="T-shirt", category="Clothing", unit_price=19.99, stock=300)
    product5 = Product.objects.create(product_name="Jeans", category="Clothing", unit_price=39.99, stock=200)
    product6 = Product.objects.create(product_name="Sneakers", category="Footwear", unit_price=59.99, stock=250)

    # Orders
    date_format = "%m/%d/%Y, %H:%M:%S"
    order1 = Order.objects.create(customer_id=customer1.id, order_time=datetime.strptime("05/24/2024, 04:59:31", date_format))
    order2 = Order.objects.create(customer_id=customer2.id, order_time=datetime.strptime("04/24/2024, 04:59:31", date_format))
    order3 = Order.objects.create(customer_id=customer3.id, order_time=datetime.strptime("03/22/2024, 04:59:31", date_format))

    # Order Details
    OrderDetails.objects.create(order_id=order1.id, product_id=product1.id, quantity=2)
    OrderDetails.objects.create(order_id=order1.id, product_id=product3.id, quantity=1)
    OrderDetails.objects.create(order_id=order2.id, product_id=product2.id, quantity=3)
    OrderDetails.objects.create(order_id=order2.id, product_id=product4.id, quantity=2)
    OrderDetails.objects.create(order_id=order3.id, product_id=product5.id, quantity=1)
    OrderDetails.objects.create(order_id=order3.id, product_id=product6.id, quantity=1)


def run_seed(self, mode):
    """ Seed database based on mode

    :param mode: refresh / clear 
    :return:
    """
    # Clear data from tables
    clear_data()
    if mode == MODE_CLEAR:
        return

    seed_data()
