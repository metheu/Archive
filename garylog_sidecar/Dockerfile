FROM alpine:3.9

RUN wget https://github.com/Graylog2/collector-sidecar/releases/download/1.0.0/graylog-sidecar-1.0.0.tar.gz

CMD tar xvf graylog-sidecar-1.0.0.tar.gz && cp -v garylog_sidecar/graylog-sidecar/1.0.0/linux/amd64/graylog-sidecar /usr/bin/graylog-sidecar && mkdir -pv /etc/graylog/sidecar

COPY sidecar.yml /etc/graylog/sidecar.yml

CMD ["/bin/sh", "/usr/bin/graylog-sidecar"]