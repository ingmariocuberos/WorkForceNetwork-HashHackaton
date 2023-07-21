# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


## Project Structure

The project is organized into the following folders:

### Assets
The "assets" folder is used to store static assets like images, icons, fonts, and other media files that are used in your application. These assets are often referenced by your components and stylesheets.
For example, you may have subfolders like "images," "icons," and "fonts" within the "assets" folder to keep assets organized.

### Pages
The "pages" folder is where you define the individual pages of your application. Each page is typically represented by a React component that serves as the view for that specific page.
In many React frameworks (e.g., Next.js), the "pages" folder is automatically used to generate routes and handle server-side rendering.

### Routes
The "routes" folder (or sometimes named "routes.js" or "routes.ts") is where you define the routing configuration for your application. It may include defining paths, corresponding components, and any additional routing-related logic.
In some projects, this folder may not exist separately if routing is handled by a dedicated library or framework.

### Utils
The "utils" folder contains utility functions and helper modules that are used throughout your application. These functions are typically non-component-specific and serve various purposes, like data manipulation, date formatting, or API handling.
Organizing reusable code in the "utils" folder can help keep your codebase clean and maintainable.

Remember that the folder structure can vary based on the project's complexity and specific requirements. Additionally, some projects might use different naming conventions or additional folders (e.g., "components," "styles," "services," "contexts," etc.). The key is to organize your project in a way that makes it easier to navigate, maintain, and understand.

Feel free to adapt the folder structure to best suit your project's needs and follow the conventions that align with your team's preferences and coding guidelines. Consistency and clarity are crucial to promoting a well-organized and maintainable React project.
