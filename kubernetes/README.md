# Dev postgre

## Start
Postgresql data directory will be mounted to /tmp/data.

Database is configured in configmap section
```
$ kubectl create -f ./deployment.yaml
configmap "postgres-config" created
persistentvolume "postgres-pv-volume" created
persistentvolumeclaim "postgres-pv-claim" created
deployment.extensions "postgres" created
service "postgres-svc" created
```


## Stop

```
$ kubectl delete -f ./deployment.yaml
configmap "postgres-config" deleted
persistentvolume "postgres-pv-volume" deleted
persistentvolumeclaim "postgres-pv-claim" deleted
deployment.extensions "postgres" deleted
service "postgres-svc" deleted
```
Postgresql data directory will stay in /tmp/data
