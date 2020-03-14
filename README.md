#palafire es una manera facil de implementar los metodos de firebase.
npm install palafire --save
Escribi los nombres de tus colecciones en un array string y usa los metodos enumerando a cada una de tus colecciones

#Interface IColecciones {
    coleccion:string[];
    documento:string[];
    subcoleccion:string[];
    subdocumento:string[];
  }