  $(function() {

    // The taskHTML method takes in a JavaScript representation of the task and produces an HTML representation using <li> tags

    function taskHTML(task) {
      var checkedStatus = task.done? "checked" : "";
        var liClass = task.done? "completed" : "";
        var liElement = '<li id= "listItem-' + task.id + '" class="' + liClass + '">' +
        '<div class="view"><input class="toggle" type="checkbox"' + 
        "data-id='" + task.id + "'" +
        checkedStatus + 
        '><label>' + 
        task.title + 
        '</label></div></li>';

        return liElement;
    }

    // toggleTask takes in an HTML representation of an event that fires from an HTML representation of the toggle checkbox and performs an API request to togggle the value of the 'done' field

    function toggleTask(e) {
      var itemId = $(e.target).data("id");
  

      var doneValue = Boolean($(e.target).is(':checked'));


      $.post("/tasks/" + itemId, {
        _method: "PUT",
        task: {
        done: doneValue
        }

      }).success(function(data) {
        var liHTML = taskHTML(data);
        var $li = $("#listItem-" + data.id);
        $li.replaceWith(liHTML);
        $('.toggle').change(toggleTask);
      });

    }

    $.get("/tasks").success( function( data ) {
      var htmlString = " ";
  
      $.each(data, function(index, task) {
        
        htmlString += taskHTML(task);
      });
      var ulTodos = $('.todo-list');
      ulTodos.html(htmlString);

      $('.toggle').change(toggleTask);

    });

    $('#new-form').submit(function(event) {
      event.preventDefault();
      var textbox = $('.new-todo');
      var payload = {
        task: {
          title: textbox.val()
        }
      };
      $.post("/tasks", payload).success(function(data) {
        var htmlString = taskHTML(data);
        var ulTodos = $('.todo-list');
        ulTodos.append(htmlString);
        $('.toggle').click(toggleTask);
        $('.new-todo').val('');
      });
    });

  });
