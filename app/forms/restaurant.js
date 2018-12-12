import React from 'react';
import t from 'tcomb-form-native';
import sliderTemplate from './templates/slider';

const Form = t.form.Form;  

export const Restaurant = t.struct({
	name: t.String,
	address: t.String,
	capacity: t.Number,
	description: t.String,
});

export const options = {
	fields: {
		name: {
			label: 'Nombre (*)',
			placeholder: 'Nombre',
		},
		address: {
			label: 'Dirección (*)',
			placeholder: 'Dirección',
		},
		capacity: {
			label: 'Capacidad (*)',
			help: 'Capacidad en personas',
			config: {
				step: 1,
				min: 1,
				max: 100,
			},
			template: sliderTemplate,
		},
		description: {
			label: 'Descripción (*)',
			placeholder: 'Descripción',
			multiline: true,
			stylesheet: {
				...Form.stylesheet,
				textbox: {
					...Form.stylesheet.textbox,
					normal: {
						...Form.stylesheet.textbox.normal,
				        height: 100,
				        textAlignVertical: 'top',
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