# Authentication module

Easy way to add authentication to your nuxt app.

## Providers

There are different types of authentication providers. Each provider has its own configuration and methods, 
and ships with its own set of dependencies.

- [E-Mail and password](src/runtime/providers/mail-password/README.md)
- [Pin](src/runtime/providers/pin/README.md) (Not implemented yet)
- [Api token](src/runtime/providers/api/README.md) (Not implemented yet)
- [Magic link](src/runtime/providers/api/README.md) (Not implemented yet)

# Development

- Run `pnpm run dev:prepare` to generate type stubs.
- Use `pnpm run dev` to start [playground](playground) in development mode.

# TODO

- [ ] Add docs
- [ ] Add tests
- [ ] Add possibility to log login actions e. g. last login etc.
- [ ] Type and describe hooks
