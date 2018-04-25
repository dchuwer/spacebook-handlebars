var SpacebookApp = function () {
    var posts = [];
  
    /*
      {text: "Hello world", id: 0, comments:[
        { text: "Man, this is a comment!"},
        { text: "Man, this is a comment!"},
        { text: "Man, this is a comment!"}
      ]},
      {text: "Hello world", id: 1, comments:[
        { text: "Man, this is a comment!"},
        { text: "Man, this is a comment!"},
        { text: "Man, this is a comment!"}
      ]},
      {text: "Hello world", id: 2, comments:[
        { text: "Man, this is a comment!"},
        { text: "Man, this is a comment!"},
        { text: "Man, this is a comment!"}
      ]}
    ];*/
  
  
  
    // the current id to assign to a post
    var currentId = 0;
    var $posts = $('.posts');
  
    var _findPostById = function (id) {
      for (var i = 0; i < posts.length; i += 1) {
        if (posts[i].id === id) {
          return posts[i];
        }
      }
    }
  
    var _findCommentsbyId = function (id) {
      for (var i = 0; i < comments.length; i += 1) {
        if (comments[i].id === id) {
          return comments[i];
        }
      }
  
    }
  
    var createPost = function (text) {
      
      var post = {
        text: text,
        id: currentId,
        comments: []
      }
  
      currentId += 1;
  
      posts.push(post);
    }
  
    var renderPosts = function () {
      $posts.empty();
  
      for (var i = 0; i < posts.length; i += 1) {
        var post = posts[i];
  
        
        var source = $('#post-template').html();
        var template = Handlebars.compile(source);
        var newHTML = template(post);
        $('.posts').append(newHTML);

  /*
        var commentsContainer = '<div class="comments-container" >' +
        '<input type="text" class="comment-name">' +
        '<button class="btn btn-primary add-comment">Post Comment</button>' +
        '<div class="comment-list"> </div>' + '</div>';
  
        $posts.append('<div class="post" data-id=' + post.id + '>'
          + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
          commentsContainer   + '</div>');
  */
  
          
          
      }
    }
  
    var removePost = function (currentPost) {
      var $clickedPost = $(currentPost).closest('.post');
      var id = $clickedPost.data().id;
  
      var post = _findPostById(id);
      
  
      posts.splice(posts.indexOf(post), 1);
      $clickedPost.remove();
    }
  
    var removeComment = function (pId,cId) {
      
      var post = _findPostById(pId);
      
      post.comments.splice(cId,1);
     
      
    }
  
  
  
  
    var renderComments = function (sel) {
      var id = $(sel).closest('.post').data().id;
      var list = $(sel).parent().find(".comment-list");
      list.empty();
      for (var j = 0; j < posts[id].comments.length; j ++) {
        list.append("<div class='parag' data-idC=" + j + ">" + 
        "<a href='#' class='removeComment'>remove</a>" +
         posts[id].comments[j].text + " </div>")
        
      }
  
  
      
  
  
    }
  
    var toggleComments = function (currentPost) {
      var $clickedPost = $(currentPost).closest('.post');
      $clickedPost.find('.comments-container').toggleClass('show');
    }
  
    
    var createComment = function (textComment,pId){
          var comment ={};
          comment.text = textComment;
          
          var post = _findPostById(pId);
          post.comments.push(comment);
          
         
         
    }
  
   
   
    return {
      createPost: createPost,
      renderPosts: renderPosts,
      removePost: removePost,
      createComment : createComment,
      renderComments : renderComments,
      removeComment : removeComment,
  
      // TODO: Implement
      // createComment: createComment,
  
      // TODO: Implement
      // renderComments: renderComments,
  
      // TODO: Implement
      // removeComment: removeComment,
      toggleComments: toggleComments
    }
  }
  
  var app = SpacebookApp();
  
  // immediately invoke the render method
  app.renderPosts();
  
  
  
  // Events
  $('.add-post').on('click', function () {
    var text = $('#post-name').val();
    
    app.createPost(text);
    app.renderPosts();
  });
  
  $('.posts').on('click', '.remove', function () {
    app.removePost(this);
  });
  
  $('.posts').on('click','.show-comments', function () {
    app.toggleComments(this);
    app.renderComments(this);
  });
  
  $('.posts').on('click', '.add-comment', function () {
   var textComment = $(this).parent().find('.comment-name').val();
   var pId = $(this).closest('.post').data().id;
   app.createComment(textComment, pId);
  //app.createComment(textComment);
  app.renderComments(this);
  
  });
  
  $('.posts').on('click', '.removeComment', function () {
    var pId = $(this).closest('.post').data().id;
    var cId = $(this).parent().data().idc;
    app.removeComment(pId,cId);
    $(this).parent().remove();
  });
  