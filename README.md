# actualizar
Update every npm dependency to `@latest`.

** Note: I don't recommend this way of updating your dependencies.**

1. Runs `npm outdated` in the current directory.
2. Installs every outdated dependency using the `@latest` tag.
If the version name includes `experimental` then it uses `@experimental` instead.

```
npx actualizar
```
