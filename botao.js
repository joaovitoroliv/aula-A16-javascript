// Callbacks
// Recall: Exemplo do botão que foi clicado
//Utilização do 'this' e 'bind'
class Menu {
    constructor() {
      // div que abriga os 3 botoes
      this.buttonContainer = document.querySelector('#menu');
      // elemento texto h1 que diz qual botao foi clicado
      this.statusBar = document.querySelector('#status-bar');
      
      this.showButtonClicked = this.showButtonClicked.bind(this);
      
      // crio uma lista com 3elementos do tipo button
      // showButtonClicked é um event listener
      this.buttons = [
        new Button(this.buttonContainer, 'A', this.showButtonClicked),
        new Button(this.buttonContainer, 'B', this.showButtonClicked),
        new Button(this.buttonContainer, 'C', this.showButtonClicked)
      ];
    }
    
    showButtonClicked(buttonName) {
      this.statusBar.textContent = buttonName + ' was clicked';
    }
  }
  
  class Button {
    constructor(containerElement, text, onClickedCallback) {
      this.containerElement = containerElement;
      this.text = text;
      this.onClickedCallback = onClickedCallback;
      
      this.onClick = this.onClick.bind(this);
      
      const button = document.createElement('button');
      button.textContent = text;
      button.addEventListener('click', this.onClick);
      this.containerElement.append(button);
    }
    
    onClick() {
      this.onClickedCallback(this.text);
    }
  }
  
  new Menu();

  // Objetos em JS: pares de propriedades e valor
  const bear = {
    //prop: valor;
    name: 'Ice Bear',
    hobbies: ['knitting', 'cooking', 'dancing']
  };

  //Classes em JS:
  class Playlist {
    constructor(name){
      this.playlistName = name;
      this.songs = [];
    }
    addSong(songName){
      this.songs.push(songName);
    }
  }
  const playlist = new Playlist ('More Life');
  const playlist2 = new Playlist('Sabadao Animado')
  playlist.addSong('Passionfruit');
  playlist.addSong('Its my Life');
  console.log(playlist);
  console.log(playlist2.playlistName);

  // PERGUNTA: Objetos que eu instancio via classe são iguais objetos javascript (bear)?
  // REPOSTA: SIMMMMMMMMMMM
  // bear = playlist 
  // playlist = {
    // playlistName: 'More Life',
    // songs: [],
    // propriedade do tipo function que pode ser alterado
    // addSong: function (songName){
    //   this.songs.push(songName);
    // }
  // }


  // Reescrevendo uma função
  class Playlist3 {
    constructor(name){
      this.playlistName = name;
      this.songs = [];
    }

    addSong(songName){
      this.songs.push(songName);
    }
  }
  const playlist3 = new Playlist3('Sextou');
  playlist3.addSong = function(songName){
    console.log("Nah!");
  };
  playlist3.addSong('Macarena'); //Nao foi enviado porque trocamos a função
  console.log(playlist3);
  playlist3.addSong = function(songName){
    this.songs.push(songName);
  };
  playlist3.addSong('Macarena');

  // PERGUNTA: Quando vamos querer reescrever a definição de um método (função)?
  // RESPOSTA: Quando fazemos um bind estamos reescrevendo um método
  // EX:
  // constructor(){
  // const someValue = this;
  //  this.onClick = this.onClick.bind(someValue);
  //}

  // Programação funcional com Javascript:
  // Programação funcional pura em javascript é meio extremo:
  // - Tudo no seu código ou é função ou expressão
  // - Nao temos variáveis, atributos, objetos, etc
  // POREM: Temos que ver 'Currying', 'Closures' e 'Anonymous Functions' que são conceitos importantes que FP nos fornece

  // First-class functions: 
  // - Podem ser salvas em variáveis
  // - Podem ser passadas como parâmetro
  // - Possuem propriedades, como outros objetos
  // - Podem ser definidas sem um identificador (função anonima)

 // Arrays possuem por padrão um método chamado findIndex - retorna o indice de um elemento
 // EX: list.findIndex(callback, thisArg);
 // - Callback é uma função com os seguintes parâmetros:
 //   - element: o element corrente que esta sendo processado
 //   - index: o indice d elemento corrente que esta sendo prcessado no array
 //   - array: o arranjo que quero utilizar
// EX: REMOVE COM UM LOOP FOR - Removes the first song in the playlist that matches |songName|, case insensitive

// Usando um loop for
function removeSong(songName){
  for (let i = 0; i < this.songs.length; i++){
    const song = this.songs[i];
    if (song.toLowerCase() === songName.toLowerCase()){
      //remove com o shift
      this.songs.shift(i,1);
      break;
    }
  }
}

// AGORA USANDO FIND INDEX
//...

// Criando Funçóes dentro de funções - APRENDEMOS O QUE É 'CLOSURE'
function descobrirIdade(birthYear) {
  const getLabel = function(age) {
    if (age < 2) {
      return "baby";
    } 
    if (age < 4) {
      return "toddler";
    }
    if (age < 13) {
      return "kid";
    }
    if (age < 20) {
      return "teenager";
    }
    return "grown-up";
  }
  
  const ageThisYear = 2021 - birthYear;
  const label = getLabel(ageThisYear);
  console.log('You are a ' + label + ' this year.');
  const label2 = getLabel(ageThisYear);
}
descobrirIdade(1996);
//const label = getLabel(8); // Nao funciona pq getLabel é 'var' e só funciona dentro do escopo

// Funções que retornam funções
// Construir uma nova função que é parcialmente instanciada com argumentos é chamada de 'CURRYING'
// Exemplo:

function makeHelloFunction(name) {
  // greeting is a "closure" because it is a function defined inside another function.
  const greeting = function() {
    console.log('Hello, ' + name);
  };
  // retorna uma função - CURRYING
  return greeting;
}

const helloWorld = makeHelloFunction('world');
const hello3 = makeHelloFunction('hello, hello');

helloWorld();
hello3();

// Funções anônimas: funções que eu nao preciso dar um nome para elas.
// Anonymous Functions
// Ex:
function makeHelloFunction2(name) {
  return function() {
    console.log('Hello, ' + name);
  };
}

// Back to Playlist with Currying
class PlaylistNew {
  constructor(name) {
    this.playlistName = name;
    this.songs = [];
  }
  
  addSong(songName) {
    this.songs.push(songName);
  }
  
  createMatchFunction(songName) {
    const findIndexFunction = function (element, index, array) {
      return element.toLowerCase() === songName.toLowerCase();
    }
    return findIndexFunction;
  }
  
  removeSong(songName) {
    // ((element) => element.toLoserCase() === songName.toLowerCase()); parametro - escopo função
    //const  index = this.songs.findIndex((element) => element.toLowerCase() === songName.toLowerCase());
    // Forma concisa da arrow function
    const  index = this.songs.findIndex(
      element => element.toLowerCase() === songName.toLowerCase());
    this.songs.shift(index, 1);
  }
}

const playlistNew = new PlaylistNew('More Life');
playlistNew.addSong('PassionFruit');
playlistNew.addSong('Fake Love');
console.log(playlistNew);
playlistNew.removeSong('passionfruit');
console.log(playlistNew);

// Mais Funções pre-definidas para usar em Arrays
// - list.forEach(function)
// - list.filter(function)
// - list.every(function)

// forEach() - para cada elemento, eu realizo uma função
// Ex:
const array1 = ['a', 'b', 'c'];
array1.forEach(parametro => console.log(parametro));

// filter() - gera uma nova lista em que nessa nova lista, só vai ter o resultado da funcao
// Ex:
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
const result = words.filter(parametro => parametro.length > 6);
console.log(result); // Expected 'exuberant', 'destruction', 'present'
const result2 = words.filter(parametro => parametro.length < 6);
console.log(result2);

// every() - verifica se todos os elementos de uma lista satisfazem uma condição
// Ex: se TODOS os valores estao abaixo de 40, retorna true, se nao, false
const isBelowThreshold = (currentValue) => currentValue < 40;
const array2 = [1,30,39,29,10,39];
console.log(array2.every(isBelowThreshold)); // Expected: true

// Gotchas and Style notes - Algumas observações
// OBS1: '=>' versus 'function': 
// Recapitulando o this: 
// - quando uso this no construtor estou me referindo ao objeto que estou construindo
// - se this estiver dentro do uma function que é chamado por outro objeto, this será o objeto
// - se o this foi chamado no eventHandler, o this será o objeto que eu adicionei no eventListener (exemplo do presente que se referencia a image sendo que quero Present)
// Porém, contudo, entretanto, caso a função tenha sido definida com uma arrow function, o this irá referenciar o escopo maior que ele está inserido.

// OBS2: Qual a melhor forma de escrever meus eventHandlers?
// Temos duas opções: eventHandler explicito, Inline eventHandler (escrever meu eventHandler dentro do addEventListener)

// Na versão explicita:
// - Pros: mais facil de ler, modular, escala melhor em funcoes longas ou com muitos eventhandlers
// - Cons: Como a maioria dos métodos das classes são publicos, expõe a função onClick (que deveria ser privado), devemos fazer um bind para referenciar o objeto.

// Na versão inline:
// - Pros: nao deixa exposto o eventHandler, função é privada e encapsulada.
// - Cons: Logica do constructor é prejudicada, pode ficar bagunçado com longo escopo de funcao

///////////////////////////////////////////////////////////////////////

 

