runtime := `(command -v podman >/dev/null 2>&1 && echo podman || echo docker)`

build:
	{{runtime}} build -t ec-recipient-portal-local -f Dockerfile .
