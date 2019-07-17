(function(global, $) {


  $(() => {
      console.log( "ready!" );
      projectClickHandler()
  })


    const projectClickHandler = () => {
      $('.all_projects').on('click', e => {
        e.preventDefault()
        console.log('hello');
      })
    }

}(window, jQuery));
