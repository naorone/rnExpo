import React from 'react';
import t from 'tcomb-form-native';
import sliderTemplate from './templates/slider';

const Form = t.form.Form;  

export const Comment = t.struct({
	rating: t.Number,
	comment: t.maybe( t.String ) 
})

export const options = {
	fields: {
		rating:{
			label: 'Puntuación',
			help: 'Puntuación del 1 al 5',
			template: sliderTemplate,
			config: {
				step: 1,
				min: 1,
				max: 5,
			},
		},
		comment: {
			label: 'Comentario',
			placeholder: 'Comentario',
			multiline: true,
			stylesheet: {
				...Form.stylesheet,
				textbox: {
					...Form.stylesheet.textbox,
					normal: {
						...Form.stylesheet.textbox.normal,
				        textAlignVertical: 'top',
						height: 100,

					},
					error: {
						...Form.stylesheet.textbox.error,
						height: 100,
					}
				}
			}
		}
	}
}