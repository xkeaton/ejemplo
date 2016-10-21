/**

Autor: Camilo Chacón Sartori. 2015

**/


goog.provide('Blockly.JavaScript.variables');

goog.require('Blockly.JavaScript');

  Blockly.Blocks['left'] = {
    init: function() {
      this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Mover a la izquierda");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(200);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  };
  Blockly.JavaScript['left'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'izquierda();\n';
    return code;
  };
  Blockly.Blocks['right'] = {
    init: function() {
      this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Mover a la derecha");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(200);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  };
  Blockly.JavaScript['right'] = function(block) {
    
    var code = 'derecha();\n';
    return code;
  };
Blockly.Blocks['start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Inicio                    ");
    this.setInputsInline(false);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
  Blockly.JavaScript['start'] = function(block) {
    
    var code = '';
    return code;
  };
  Blockly.Blocks['attack'] = {
    init: function() {
      this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Ataque");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(200);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  };
  Blockly.JavaScript['attack'] = function(block) {
    
    var code = 'attackMove();\n';
    return code;
  };
  Blockly.Blocks['attackToBox'] = {
    init: function() {
      this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Saltar y destruir la caja");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(200);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  };
  Blockly.JavaScript['attackToBox'] = function(block) {
    
    var code = 'saltar_y_destruir_caja();\n';
    return code;
  };
 Blockly.Blocks['jump'] = {
      init: function() {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Saltar");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(200);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };
    Blockly.JavaScript['jump'] = function(block) {
      
      var code = 'saltar();\n';
      return code;
    };

  Blockly.Blocks['attr_jump_power'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Fuerza de Salto")
          .appendField(new Blockly.FieldDropdown([["Débil", "debil"], ["Normal", "normal"], ["Fuerte", "fuerte"]]), "opciones_salto");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(180);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  };

  Blockly.JavaScript['attr_jump_power'] = function(block) {
    var dropdown_opciones_salto = block.getFieldValue('opciones_salto');
    // TODO: Assemble JavaScript into code variable.
    var code = 'asignarFuerzaDeSalto("' + dropdown_opciones_salto + '");\n';
    return code;
  };
  
  
 



Blockly.Blocks['var_estoyfrenteaunacaja'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Crear variable")
        .appendField(new Blockly.FieldVariable("estoy frente a una caja"), "estoy_frente_a_una_caja")
        .appendField("con valor")
        .appendField(new Blockly.FieldDropdown([["Verdadero", "true"], ["Falso", "false"], ["", ""]]), "opciones");
    this.setInputsInline(true);
     this.setPreviousStatement(true);
      this.setNextStatement(true);
    this.setColour(165);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
var temporal = null;
Blockly.JavaScript['var_estoyfrenteaunacaja'] = function(block) {
  var variable_estoy_frente_a_una_caja = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('estoy_frente_a_una_caja'), Blockly.Variables.NAME_TYPE);
  var dropdown_opciones = block.getFieldValue('opciones');
  // TODO: Assemble JavaScript into code variable.
  var code = 'var ' + variable_estoy_frente_a_una_caja + ' = ' + dropdown_opciones.toString() + ';\n';
  temporal = dropdown_opciones;
  
  return code;
};

Blockly.Blocks['var_value_estoyfrenteaunacaja'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("estoy frente a una caja"), "estoy_frente_a_una_caja");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(165);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['var_value_estoyfrenteaunacaja'] = function(block) {
  var variable_estoy_frente_a_una_caja = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('var_estoyfrenteaunacaja'), Blockly.Variables.NAME_TYPE);
  var code = variable_estoy_frente_a_una_caja;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


  Blockly.Blocks['attr_speed_power'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Velocidad")
          .appendField(new Blockly.FieldDropdown([["Lenta", "lenta"], ["Normal", "normal"], ["Rápida", "rápida"]]), "opciones_velocidad");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(180);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  };
  Blockly.JavaScript['attr_speed_power'] = function(block) {
    var dropdown_opciones_velocidad = block.getFieldValue('opciones_velocidad');
    // TODO: Assemble JavaScript into code variable.
    var code = 'asignarVelocidad("' + dropdown_opciones_velocidad + '");\n';
    return code;
  };
Blockly.Blocks['existe_caja'] = {
  init: function() {
    this.appendValueInput("existe_caja_valor")
        .setCheck("Boolean")
        .appendField("asignar a")
        .appendField(new Blockly.FieldTextInput("existe caja"), "existe_caja_var");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['existe_caja'] = function(block) {
  var text_existe_caja_var = block.getFieldValue('existe_caja_var');
  var value_existe_caja_valor = Blockly.JavaScript.valueToCode(block, 'existe_caja_valor', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = "";
  console.log(value_existe_caja_valor);
  if (value_existe_caja_valor != ""){
     code = 'var existe_caja = '+ value_existe_caja_valor.toString() + ';\n';
  }else{
     code = 'var existe_caja = false;\n';
  }
  return code;
};

Blockly.Blocks['existe_caja_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("existe caja"), "existe_caja_var");
    this.setOutput(true, null);
    this.setColour(300);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.JavaScript['existe_caja_value'] = function(block) {
  var variable_existe_caja_var = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('existe_caja_var'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble JavaScript into code variable.
  var code = variable_existe_caja_var;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};