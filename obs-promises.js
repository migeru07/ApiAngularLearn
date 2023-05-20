const { Observable } = require('rxjs');
const { filter } = require('rxjs/operators');

//Creamos la promesa
const doSomething = () => {
  return new Promise((resolve) => {
    //resolve('valor 1');
    //resolve('valor 2');
    setTimeout(() => {
      resolve('valor 1 Prometido');
    }, 3000);
  });
}

//Lo hacemos en forma de un observador
const doSomething$ = () => {
  return new Observable(observer => {
    observer.next('valor 1 $');
    observer.next('valor 2 $');
    observer.next('valor 3 $');
    observer.next(null);
    setTimeout(() => {
      observer.next('valor 4 $');
    }, 5000);
    setTimeout(() => {
      observer.next(null);
    }, 6000);
    setTimeout(() => {
      observer.next('valor 5 $');
    }, 8000);
  });
}

//La corremos en un contexto asincrono
(async () => {
  const rta = await doSomething();
  console.log(rta);
})();

//Nos subscribimos al observador
(() => {
  const obs$ = doSomething$();
  obs$.pipe(
    filter(value => value !== null  )
  )
  .subscribe(rta => {
    console.log(rta);
  })
})();
