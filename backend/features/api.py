from django.db.models.query_utils import Q

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response

from features.models import Feature
from features.serializers import FeatureSerializer

class FeatureViewSet(ViewSet):
    """ feature endpoints
    """
    serializer_class = FeatureSerializer

    def get(self, *args, **kwargs):
        id = self.request.GET.get('id', '')
        if id:
            instance = Feature.objects.get(id=id)
            if instance:
                serializer = self.serializer_class(instance=instance)
                return Response(serializer.data, status=200)
            return Response(status=400)
        else:
            serializer = self.serializer_class(
                instance=Feature.objects.order_by('-date_created'),
                many=True,
            )
            return Response(serializer.data, status=200)

    def add(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=self.request.data)
        print(serializer.is_valid())
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=403)

    def update(self, request, *args, **kwargs):
        id = self.request.data.get('id')
        serializer = self.serializer_class(
            instance=Feature.objects.get(id=id),
            data=self.request.data,
        )
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=403)

    def delete(self, *args, **kwargs):
        id = self.request.GET.get('id')
        try:
            feature = Feature.objects.get(id=id)
            feature.delete()
        except:
            return Response(status=400)
        return Response(status=200)
