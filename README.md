# Welcome to our recruitment task 

## Where to start

To install project execute:

```
npm install

or if you use yarn

yarn install
```

If everything is successfully installed, execute `npm run start` or `yarn start` depending on your package manager of choice.

If you want to rebuild tailwind styles `npm run tailwind` or `yarn tailwind`, add `--watch` if you want to run it in watch mode.

### The most important files in the app

1. [app.component.ts](./src/app/app.component.ts)
2. [pokemon-list-resource.service.ts](./src/app/pokemon-list-resource.service.ts)
3. [stack.component.ts](./src/stack/stack.component.ts)
4. [stack-item.ts](./src/stack/stack-item.ts)
5. [app-routing.module.ts](./src/app/app-routing.module.ts)

## Rules
There are a very few rules:
- Use whatever IDE you like
- Remember about running lint command after completing the task
- In README.md you can leave some notes for us
- Installing additional dependencies is forbidden
- For styling, you can use tailwindcss, which is installed for you

## Tasks

Please notice that `noop` zone is provided in `main.ts`;

1. When user is clicking on a Pokemon, the Pokemon is highlighted with color (use css class bg-gray-100). Check out the StackComponent class, I left for you a few tips :)

![selected](./selected.png)

2. When user is clicking "Load more", 10 more items are loaded from the API
3. When user is clicking on a Pokemon, details with more Pokemons are visible. Please use DetailsComponent and Router to complete this task.

![detail](./details.png)

### Extra tasks (no extra points, but you can try your skills)

1. Refactor existing code
2. You can change the look and feel of the app

## Resources

API Docs: [https://pokeapi.co/docs/v2](https://pokeapi.co/docs/v2)

I left types in the PokemonListResourceService class to make it easier :) 

## Notes

1. 'ng update' Angular 15.2.9 but Angular14 is LTS for now and would be better for commercial projects
2. I enabled ngZone because working without ngZone can be unpredictable and make things difficult 
3. Change file structure
4. Change file/class/method/name
5. Light code refactoring etc.