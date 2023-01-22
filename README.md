# Wizzcad Challenge

API in Typescript and Node that allows for the management of form model creation.

## Getting started

```sh
git clone https://github.com/germainvictor/wizzcad-challenge.git
cd wizzcad-challenge
yarn
yarn db-migrate
yarn start
```

## Endpoints

### POST `/newForm`

This endpoint creates a new form. To create a form you have to return a json of this type :

```JSON
{
	"name": "formName",
	"metadata": [{
		"type": "field",
		"name": "FirstName",
		"required": "true",
		"subType": "TEXT"
	}, {
		"type": "field",
		"name": "LastName",
		"required": "true",
		"subType": "TEXT"
	},
	{
		"type": "section",
		"name": "section-1",
		"metadata": [{
			"type": "field-section-1",
			"name": "LastName",
			"required": "true",
			"subType": "TEXT"
		}]
	}]
}
```

First you have to name your form

```JSON
{
	"name": "formName", <--- Name of the form
	"metadata": [...] <-- Metadata this form contains
}
```

And add metadata, the metadata respresents the structure of your form.
**You have two type of metadata :**

**Field metadata :**

```JSON
{
		"type": "field", <-- Type of the metadata
		"name": "FirstName", <-- Name of the field
		"required": "true", <-- Is field is required
		"subType": "TEXT" <-- The type of the field
	}
```

You have `BOOLEAN`, `LIST`, `DIGITAL`, `TEXT` as available type of field

**Section metadata :**
Each section can contain field and section

```JSON
{
		"type": "section", <-- Type of the metadata
		"name": "section-1", <-- Name of section
		"metadata": [...] <-- Metadata this section contains
}
```

### GET `/form/:id`

Return a form. You can pass the `seeDeletedElement` parameter to see the deleted elements of the form.

### GET `/forms`

Returns the list of all forms. You can pass the `seeDeletedElement` parameter to see the deleted elements of the form.

### POST `/add/field`

Allows you to add a field to a form or a section. You can pass this json :

```JSON
{
	formId: 1, <-- The form id
	sectionId: 1, <-- The section id
	type: "TEXT", <-- Type of the field
	name: "fieldName", <-- Name of the field
	required: "true" <- If form is required
}
```

⚠️ You can only assign either a section or a form.

### POST `/add/section`

Allows you to add a field to a form or a section. You can pass this json :

```JSON
{
	formId: 1, <-- The form id
	sectionId: 1, <-- The section id
	name: "sectionName", <-- Name of the field
	metadata: [...] <-- The metadata contained in this section
}
```

⚠️ You can only assign either a section or a form.

### POST `/update/section/:id`

Allows you to update a section. You can pass this json :

```JSON
{
	name: "newName", <-- The new name of the section
	sofDeleted: "false", <-- If you need to restore/destroy section
}
```

### POST `/update/field/:id`

Allows you to update a field. You can pass this json :

```JSON
{
	name: "newName", <-- The new name of the field
	required: "true" <-- If this field is required
	sofDeleted: "false", <-- If you need to restore/destroy field
}
```

### POST `/update/form/:id`

Allows you to update a form. You can pass this json :

```JSON
{
	name: "newName", <-- The new name of the form
}
```

### POST `/delete/form/:id`

Allows you to delete a form.

## Improvements

- Add all the logic of the field `LIST`
- Adding an order to the form elements
- Add tests to ensure that the application is working properly.
