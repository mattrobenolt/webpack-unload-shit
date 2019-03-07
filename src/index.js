function component() {
  let element = document.createElement('div');

  var button = document.createElement('button');
  var br = document.createElement('br');

  button.innerHTML = 'Click me';
  element.innerHTML = 'Hello webpack';
  element.appendChild(br);
  element.appendChild(button);

  button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
    var print = module.default;
    print();
  });

  return element;
}

document.body.appendChild(component());
