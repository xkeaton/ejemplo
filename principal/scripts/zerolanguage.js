/**

Autor: Camilo Chacón Sartori. 2015

**/
var functionToSpanish =
{
	"jumpMove();": "saltar();",
	"rightMove();": "derecha();",
	"leftMove();": "izquierda();",
	"attackMove();":"ataque();",
	"attackToBox();":"saltarDestruirCaja();",
	"setJumpPower(\"low\");": "fuerzaSalto(\"debil\");",
	"setJumpPower(\"normal\");": "fuerzaSalto(\"normal\");",
	"setJumpPower(\"hard\");": "fuerzaSalto(\"fuerte\");",
	"setSpeedPower(\"slow\");": "velocidad(\"baja\");",
	"setSpeedPower(\"normal\");": "velocidad(\"normal\");",
	"setSpeedPower(\"fast\");": "velocidad(\"fuerte\");",
}

var translateToFunctions = 
{
	"estoy_frente_a_una_caja": "checkFrontBox()"
}