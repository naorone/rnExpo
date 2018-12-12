import t from 'tcomb-form-native';

const formValidation = {
	email: t.refinement( t.String, (value) => {
			return /@/.test( value ); //Validamos que el email contenga @
		}),
	password: t.refinement( t.String, (value) => {
			return value.length >= 6;
		}),

};

export default formValidation;