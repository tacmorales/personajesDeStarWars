

function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(() => {
  function tab(){
    let flexChildren = document.querySelectorAll('.card');
    let leftPosition = flexChildren[0].offsetLeft;
    for(let i = 1; i < flexChildren.length; i++){
      let flexChild = flexChildren[i];
      if (flexChild.classList.contains('main-card')){
        continue;
      }
      if(flexChild.offsetLeft <= leftPosition){
        flexChild.classList.add('margin-left');
      }else{
        flexChild.classList.remove('margin-left');
      }
    }
  }
  window.addEventListener('resize', tab);
  tab();
})

