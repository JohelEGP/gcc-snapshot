# GCC Snapshot

Sets up the latest GCC snapshot ready-to-use.

It uses the package from https://jwakely.github.io/pkg-gcc-latest/
and thus requires an Ubuntu runner.

It has no output or required input arguments.
It uses no secrets.

It prepends to `PATH` and `LD_RUN_PATH`
so that the snapshot is ready-to-use.

## Optional input argument

`cache`:
Whether to use `@actions/cache` for the snapshot.
`true` (default) or `false`.

## Example

```yml
on: push
jobs:
  gcc-snapshot:
    runs-on: ubuntu-latest
    steps:
      - uses: johelegp/gcc-snapshot@v1 # This action.
      - uses: actions/checkout@v2
      - uses: johelegp/modern-cmake-buildsystem@
```https://www.snapchat.com/add/hhh4t3
