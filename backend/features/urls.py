from django.urls import path, re_path
from .api import FeatureViewSet


urlpatterns = [
    path('', FeatureViewSet.as_view({
        'get': 'get',
    }), name="feature_list"),

    path('create/', FeatureViewSet.as_view({
        'post': 'add',
    }), name="add_feature"),

    path('update/', FeatureViewSet.as_view({
        'put': 'update',
    }), name="update_feature"),

    path('delete/', FeatureViewSet.as_view({
        'post': 'delete'
    }), name='delete_feature')
]