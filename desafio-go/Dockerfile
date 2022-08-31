FROM golang:alpine AS builder

RUN apk update && apk add --no-cache git

WORKDIR $GOPATH/src/mypackage/myapp/

COPY . .

RUN go get -d -v

RUN go build -o /go/bin/fullcycle

FROM scratch

COPY --from=builder /go/bin/fullcycle /go/bin/fullcycle

ENTRYPOINT ["/go/bin/fullcycle"]