
const axios = require('axios');
<comments class="comments">

  <div class="comments">
    <comment  each={ comments } data={ this }></comment>
    <addComment class="add-comment" articleId={ articleId }></addComment>
  </div>

  <script>
    comments = [];
    articleId = opts.articleId;
    commentsUrl = opts.commentsUrl;
    axios.get(`${commentsUrl}/${articleId}`)
      .then( req => {
        console.log(req.data);
        this.comments = req.data;
        this.update();
      })
      .catch( err => {
        console.error(err);
      })

  </script>
</comments>

<comment>
  
  <div class="pure-g 1-box comment">
    <div class="pure-u-1-1 comment-meta">
     {opts.data.timestamp}, { opts.data.author}
    </div>
    <div class="pure-u-1-1">
     { opts.data.text }
    </div>
  </div>
  <div class="em-1"/>

</comment>


<addComment>
  <form  method="post" class="pure-form pure-form-stacked">
    <div class="pure-g">

      <div class="pure-u-1-1">
        <label for="author">Author:</label>
        <input id="author" name="author"><br />
      </div>

      <div class="pure-u-1-1">
        <label for="text">Comment:</label>
        <textarea id="text" name="text"/><br />
      </div>

      <div id="captcha" type="button" class="g-recaptcha" data-sitekey="6Ld8rTAUAAAAACCyQ-Oj_ss8yquADDWXNby5tu1q"></div>

    </div>
    <button id="addBtn" onclick = { add } class="pure-button pure-button-primary" >Add comment</button>
    <div class="error-msg">{errorMsg}<div>
  </form>

  <script>
    add = (e) => {
      e.preventDefault();
      this.errorMsg = "";
      axios.post(commentsUrl, {
        articleId: opts.articleid,
        "g-recaptcha-response": document.getElementById("g-recaptcha-response").value,
        author: author.value,
        text: text.value
      })
      .then( () => {
        console.log("Post created")
        this.update();
      })
      .catch( err => { 
        console.log("Error while creating post", err)
        const jsonErr = JSON.parse(err.request.response);
        
        this.errorMsg = `${jsonErr.message}, details: ${jsonErr.details.join(',')}`;
        this.update();
      });
    }
  </script>
</addComment>