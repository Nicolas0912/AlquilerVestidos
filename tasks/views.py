from rest_framework import viewsets
from .serializer import TakeSerializer
from .models import Task

# Create your views here.
class TaskView(viewsets.ModelViewSet):
    serializer_class = TakeSerializer
    queryset = Task.objects.all()