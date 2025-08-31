# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## steps

1) npm create vite@latest

2) npm i @reduxjs/toolkit react-redux

3) Setup Store

    i) configure Store from "@reduxjs/toolkit"
    ii) setup Reducer ( a function that decide how state should change based on actions.)
    iii) Actions : an event describe "what happened" eg. addToCart(item)
    iv) Store : the single object that holds the entire state of app
    v) Provider wrap around <App/> component and pass store to it.
    vi) Main Step :
        a) createSlice from "@reduxjs/toolkit"
        b) setup intialState of store
        eg. {
            id : 1,
            name: "Adidas shoes",
            price: 999,
            quantity: 2
        }
        c)# E-Commerce-Cart-React-Redux
