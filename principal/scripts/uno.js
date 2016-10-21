  $(document).ready(function(){

      $("body").show();
      $(".fakeLoader").fakeLoader({ 
        timeToHide:1000, 
        zIndex:9999, 
        spinner:"spinner7", 
        bgColor:"#D0F4F7" });

    Q.load("rex.json, rex.png, ,barren1.png, grass1.png,cactus.png, bg.png, cloud1.png, cloud2.png, cloud3.png, grassHalfMid.png, " +
        "grassCenter.png, background-floor.png, plant.png, coin.png, coin.json", function() {
        Q.compileSheets("rex.html","rex.json");
        Q.compileSheets("coin.html","coin.json");
        Q.animations("rex", {
          idle: { frames: [6,7,8], rate: 1/3, flip: false, loop: true },
          run: { frames: [0,1,2,3,4,5], rate: 1/15, flip: false },
          attack: { frames: [8,9,10,11], rate: 1/5, flip: false, trigger: "_idle", loop:false},
          jump: { frames: [6,7,8], rate: 1/1, flip: false, trigger: "_idleAfterJump"},
        });
        Q.stageScene("level1");
      // Q.debug = true;
    });

 
    Blockly.Xml.domToWorkspace(workspace,document.getElementById('startBlocks'));
    
  });

    var globalVar;
    var highlightStep = [];
    var commandsTimeout = [];
    var codeTextArea = { "raw": "", "visualization": ""};
    var workspace = Blockly.inject('blocklyDiv',
         { media: '../../media/',
          zoom: { enable: true },
          trashcan: true,
          grid:{spacing: 20,
          length: 3,
          colour: '#ccc',
          snap: true  },
          toolbox: document.getElementById('toolbox')});

    var myInterpreter = null;

    function initApi(interpreter, scope) {
      /////////////////////////////////////////////////////////////////
      var setSpeedPower = function(text) {
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(rex.setJumpPower(text));
      };
      interpreter.setProperty(scope, 'asignarVelocidad',
          interpreter.createNativeFunction(setSpeedPower));

    /////////////////////////////////////////////////////////////////
      var setJumpPower = function(text) {
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(rex.setJumpPower(text));
      };
      interpreter.setProperty(scope, 'asignarFuerzaDeSalto',
          interpreter.createNativeFunction(setJumpPower));
      /////////////////////////////////////////////////////////////////
      var _checkIsWin = function(text) {
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(checkIsWin('level1'));
      };
      interpreter.setProperty(scope, 'checkIsWin',
          interpreter.createNativeFunction(_checkIsWin));
      
      ///////////////////////////////////////////////////////////////
      var rightMove = function(text) {
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(rex.rightMove());
      };
      interpreter.setProperty(scope, 'derecha',
          interpreter.createNativeFunction(rightMove));

      ////////////////////////////////////////////////////////////////
      var leftMove = function(text) {
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(rex.leftMove());
      };
      interpreter.setProperty(scope, 'izquierda',
          interpreter.createNativeFunction(leftMove));

      /////////////////////////////////////////////////////////////////
      var attackToBoxMove = function(text) {
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(rex.attackToBoxMove());
      };
      interpreter.setProperty(scope, 'saltar_y_destruir_caja',
          interpreter.createNativeFunction(attackToBoxMove));

      /////////////////////////////////////////////////////////////////
      var jump = function(text) {
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(rex.jumpMove());
      };
      interpreter.setProperty(scope, 'saltar',
          interpreter.createNativeFunction(jump));


      var wrapper = function(text) {
        console.log(text);
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(prompt(text));
      };
      interpreter.setProperty(scope, 'prompt',
          interpreter.createNativeFunction(wrapper));


      var wrapper = function(id) {
        console.log(id);
        id = id ? id.toString() : '';
        return interpreter.createPrimitive(highlightBlock(id));
      };
      interpreter.setProperty(scope, 'highlightBlock',
          interpreter.createNativeFunction(wrapper));
    }

    var highlightPause = false;

    function highlightBlock(id) {
      workspace.highlightBlock(id);
      highlightPause = true;
    }

    function parseCode(isStep) {
      Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
      Blockly.JavaScript.addReservedWords('highlightBlock');
      var code = Blockly.JavaScript.workspaceToCode(workspace);
    
      var codelines = code.split("\n");
      var codevisualization = "";
      for(var i = 0; i < codelines.length; i++){
        if(codelines[i].indexOf("highlightBlock") == -1){
          codevisualization += codelines[i] + '\n';
        }
      }

      code += "checkIsWin();\n";

      console.log(codevisualization);
      codeTextArea["raw"] = code;
      codeTextArea["visualization"] = codevisualization;
      $("#codeArea").text(codeTextArea["visualization"]);
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
      
      myInterpreter = new Interpreter(code, initApi);
      //alert('Ready to execute this code:\n\n' + code);
      //document.getElementById('stepButton').disabled = '';
      
      if(isStep){
        
        highlightPause = false;
        workspace.traceOn(true);
        workspace.highlightBlock(null);
        nextStep();
        
      }
    }
    function nextStep(){
      if(myInterpreter.step()){
        setTimeout(nextStep, 50);
      }
      
      
    }
    function stepCode() {
      try {

        var ok = eval(myInterpreter.step());
      } finally {
        if (!ok) {
          // Program complete, no more code to execute.
         // document.getElementById('stepButton').disabled = 'disabled';
          return;
        }
      }
      if (highlightPause) {
        // A block has been highlighted.  Pause execution here.
        highlightPause = false;
      } else {
        // Keep executing until a highlight statement is reached.
        stepCode();
      }/*
      if (myInterpreter.step()) {
          highlightStep.push(setTimeout(nextStep, 120));
      }*/
    }
    function onClickViewBlock(){
        $('.blocklyToolboxDiv').show();
        $('#trashButton').prop('disabled', false);
    }
    function onClickViewCode(){
        $('.blocklyToolboxDiv').hide(); 
        $('#codeArea').show();
        parseCode(false);
        $('#codeArea').prop('disabled', true);
        $('#trashButton').prop('disabled', true);

    }
