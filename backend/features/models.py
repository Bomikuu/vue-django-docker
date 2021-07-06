from django.db import models


class Feature(models.Model):
    TYPE_CHOICES = (
        ('Principles', 'Principles'),
        ('Values', 'Values'),
    )

    feature_title = models.CharField(max_length=255, blank=True)
    feature_description = models.TextField(blank=True, null=True)
    feature_type = models.CharField(default='Feature', max_length=255, choices=TYPE_CHOICES)

    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{}".format(self.feature_title)