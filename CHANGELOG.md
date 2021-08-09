# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- enum `AsymKeyTypes` with values [`APP`, `USER`] to model the two asym key types we have

### Changed

- migrated existing code to typescript
- key types are exported as `D4LKeyTypes` (was `keyTypes`)
- key types is modelled as an enum (was an object): `[USER|APP]_[PRIVATE|PUBLIC]_KEY` replace `[USER|APP].[PRIVATE|PUBLIC]_KEY`
- `generateAsymKeyPair` takes a parameter of type `AsymKeyTypes` instead of object

### Deprecated

### Removed

### Fixed

### Security

[Unreleased]: https://github.com/gesundheitscloud/go-svc/compare/v1.2.2...HEAD
[v1.2.2]: https://github.com/gesundheitscloud/go-svc/releases/tag/v1.2.2
