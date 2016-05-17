var etiquetas = {
	"leyendaArticulo":"Selecciona un tipo de tarjeta.",
	"nmTEt1":"Nombre del Artículo",
	"nmTEt2":"Compra Nacional",
	"nmTEt3":"Compra Internacional",
	"nmTEt4":"Número de cuotas",
	"nmTEt5":"Precio (PESOS $)",
	"nmTEt6":"Precio (USD $)",
	"leyendaCompra":"Primero debes agregar compras y calcular pagos.",
	"nmTResultadoSim":"Resultado de la simulación",
	"nmLeyendaResultado":"Los valores resultantes de esta simulación, son informativos, aproximados y pueden variar. Esta herramienta no constituye una asesoría contable ni tributaria.",
	"nmTCompraNal":"Compras Nacionales",
	"nmTEt1Res":"Mes",
	"nmTEt2Res":"Pago Mínimo",
	"nmTEt3Res":"Intereses",
	"nmTEt4Res":"Pago Total",
	"nmTEavance1":"Comisión",
	"leyendaInfo1":"Las compras internacionales se difieren a 24 meses.",
	"leyendaInfo2":"Los avances se difieren a 18 meses.",
	"leyendaInfo3_1":"Las Millas acumuladas pueden ser utilizadas en tiquetes, reservas de hotel, alquiler de autos, bonos de tecnología, recargas de celular a cualquier operador en Colombia y transferencias al programa Lifemiles. Te invitamos a ver el",
	"leyendaInfo3_2":"catálogo de millas.",
	"leyendaInfo4":"El pago de impuestos en las oficinas de Tesorería de las entidades públicas genera millas.",
	"leyendaInfoAvance":"Recuerda que los avances se difieren a 18 cuotas",
	"leyendaInfoInternacional":"Recuerda que las compras internacionales se difieren a 24 cuotas",
	"etqCompraNacional":"Ingresa el precio ($) en pesos",
	"etqCompraInternacional":"Ingresa el precio ($) en dolares americanos",
	"etqVisa":"Las tarjetas de crédito VISA solo realizan compras internacionales en pesos, el valor de la TRM utilizado para el cálculo es de",
	"parrafoInfoResultados":"A continuación te presentamos el detalle de tu simulación a través de las siguientes columnas: Mes, Pago mínimo, Intereses y Pago total."
};

var datosTarjetas = {
  "NmTarjeta": [
    {
      "Nombre": "American Express",
      "nmTipo": [
        {
          "nombreTipo": "Azul",
          "Prop": {
            "CompraNacional": 2.12,
            "CompraInternacional": 2.07,
            "Avance": 2.12,
            "USD": 2,
            "Millas": 1
          }
        },
        {
          "nombreTipo": "Oro",
          "Prop": {
            "CompraNacional": 2.11,
            "CompraInternacional": 2.07,
            "Avance": 2.12,
            "USD": 1,
            "Millas": 1
          }
        },
        {
          "nombreTipo": "Platinum",
          "Prop": {
            "CompraNacional": 2.11,
            "CompraInternacional": 2.07,
            "Avance": 2.12,
            "USD": 1,
            "Millas": 1
          }
        },
        {
          "nombreTipo": "Verde",
          "Prop": {
            "CompraNacional": 2.11,
            "CompraInternacional": 2.07,
            "Avance": 2.12,
            "USD": 1.5,
            "Millas": 1
          }
        }
      ]
    },
    {
      "Nombre": "Master Card",
      "nmTipo": [
        {
          "nombreTipo": "Black",
          "Prop": {
            "CompraNacional": 2.11,
            "CompraInternacional": 2.07,
            "Avance": 2.12,
            "USD": 1,
            "Millas": 1
          }
        },
        {
          "nombreTipo": "Clásica",
          "Prop": {
            "CompraNacional": 2.12,
            "CompraInternacional": 2.07,
            "Avance": 2.12,
            "USD": 2,
            "Millas": 1
          }
        },
        {
          "nombreTipo": "E-Card",
          "Prop": {
            "CompraNacional": 2.12,
            "CompraInternacional": 2.07,
            "Avance": 2.12,
            "USD": 2,
            "Millas": 1
          }
        },
        {
          "nombreTipo": "Esso Mobil Clásica",
          "Prop": {
            "CompraNacional": 2.12,
            "CompraInternacional": 2.07,
            "Avance": 2.12,
            "USD": 2,
            "Millas": 3
          }
        },
        {
          "nombreTipo": "Esso Mobil Oro",
          "Prop": {
            "CompraNacional": 2.11,
            "CompraInternacional": 2.07,
            "Avance": 2.12,
            "USD": 1.5,
            "Millas": 3
          }
        },
        {
          "nombreTipo": "Ideal",
          "Prop": {
            "CompraNacional": 2.12,
            "CompraInternacional": 2.07,
            "Avance": 2.12,
            "USD": "NA",
            "Millas": "NA"
          }
        },
        {
          "nombreTipo": "Intelecto Clásica",
          "Prop": {
            "CompraNacional": 2.12,
            "CompraInternacional": 2.07,
            "Avance": 2.12,
            "USD": 2,
            "Millas": 1
          }
        },
        {
          "nombreTipo": "Intelecto Oro",
          "Prop": {
            "CompraNacional": 2.11,
            "CompraInternacional": 2.07,
            "Avance": 2.12,
            "USD": 1.5,
            "Millas": 1
          }
        },
        {
          "nombreTipo": "Joven",
          "Prop": {
            "CompraNacional": 2.12,
            "CompraInternacional": 2.07,
            "Avance": 2.12,
            "USD": 2,
            "Millas": 1
          }
        },
        {
          "nombreTipo": "Oro",
          "Prop": {
            "CompraNacional": 2.11,
            "CompraInternacional": 2.07,
            "Avance": 2.12,
            "USD": 1.5,
            "Millas": 1
          }
        },
        {
          "nombreTipo": "Platinum",
          "Prop": {
            "CompraNacional": 2.11,
            "CompraInternacional": 2.07,
            "Avance": 2.12,
            "USD": 1,
            "Millas": 1
          }
        },
        {
          "nombreTipo": "Sufi Clásica",
          "Prop": {
            "CompraNacional": 2.12,
            "CompraInternacional": 2.07,
            "Avance": 2.12,
            "USD": 2,
            "Millas": 1
          }
        },
        {
          "nombreTipo": "Sufi Oro",
          "Prop": {
            "CompraNacional": 2.11,
            "CompraInternacional": 2.07,
            "Avance": 2.12,
            "USD": 1.5,
            "Millas": 1
          }
        },
        {
          "nombreTipo": "Empresarial",
          "Prop": {
            "CompraNacional": 2.14,
            "CompraInternacional": 2.14,
            "Avance": 2.14,
            "USD": 2,
            "Millas": 1
          }
        }
      ]
    },
    {
      "Nombre": "Visa",
      "nmTipo": [
        {
          "nombreTipo": "Avianca LifeMiles Micropyme",
          "Prop": {
            "CompraNacional": 2.13,
            "CompraInternacional": 2.13,
            "Avance": 2.13,
            "USD": 2,
            "Millas": 1
          }
        },
        {
          "nombreTipo": "Avianca LifeMiles Pyme",
          "Prop": {
            "CompraNacional": 2.13,
            "CompraInternacional": 2.13,
            "Avance": 2.13,
            "USD": 1.5,
            "Millas": 1
          }
        },        
        {
          "nombreTipo": "Clásica",
          "Prop": {
            "CompraNacional": 2.12,
            "CompraInternacional": 2.07,
            "Avance": 2.12,
            "USD": 2,
            "Millas": 1
          }
        },
        {
          "nombreTipo": "Infinite",
          "Prop": {
            "CompraNacional": 2.11,
            "CompraInternacional": 2.07,
            "Avance": 2.12,
            "USD": 1,
            "Millas": 1
          }
        },
        {
          "nombreTipo": "Futbol",
          "Prop": {
            "CompraNacional": 2.12,
            "CompraInternacional": 2.07,
            "Avance": 2.12,
            "USD": 2,
            "Millas": 1
          }
        },
        {
          "nombreTipo": "Oro",
          "Prop": {
            "CompraNacional": 2.11,
            "CompraInternacional": 2.07,
            "Avance": 2.12,
            "USD": 1.5,
            "Millas": 1
          }
        },
        {
          "nombreTipo": "Platinum",
          "Prop": {
            "CompraNacional": 2.11,
            "CompraInternacional": 2.07,
            "Avance": 2.12,
            "USD": 1,
            "Millas": 1
          }
        },
        {
          "nombreTipo": "Empresarial",
          "Prop": {
            "CompraNacional": 2.14,
            "CompraInternacional": 2.14,
            "Avance": 2.14,
            "USD": 2,
            "Millas": 1
          }
        }
      ]
    }
  ]
};

var parametros = {
             "LimiteCuotas" : {"id":1,"minCuota":1,"maxCuota":60},
             "LimitesCompra": {"min":5000.00,"max":300000000},
             "comisionAvance" : {"id":1,"vNal":4139},
             "TipoArticulo" : [
             					
							    {"id" : 1, "label":"Avances"},
							    {"id" : 2, "label":"Compras"}
							  ],
			"TipoArticuloEmp" : [
									{"id":1,"label":"Pago de impuestos en Tesorería"},
							        {"id":2,"label":"Compra de tiquetes"},
							        {"id":3,"label":"Pago de Alojamiento"},
							        {"id":4,"label":"Renta de Vehiculos"},
							        {"id":5,"label":"Restaurantes y presentes corporativos"},
							        {"id":6,"label":"Papelería"},
							        {"id":7,"label":"Insumos o materias primas"},
							        {"id":8,"label":"Lavandería"}
							    ],
			"CompraNacional" : [ 
									{"id":1, "label":"Nacional"},{"id":2,"label":"Internacional"} 
							   ],
			"mensajeMaximaCompra":{"id":1,"mensajesMax":"Máximo puede adicionar 10 compras"},
            "trm": 2677.97
};