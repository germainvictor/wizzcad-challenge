const { Op } = require('sequelize');

import models from '../../models';
import { Section, Form } from '../type';

export async function getSectionsData(sections: Section[], where: any) {
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];

    // We recover all the information of the section
    const subSections = await models.section.findAll({
      where: { ...where, sectionId: section.id },
      include: [
        {
          required: false,
          model: models.field,
          as: 'fields',
          where,
        },
        {
          required: false,
          model: models.section,
          as: 'sections',
          where,
        },
      ],
    });

    sections[i].sections = [];
    // If a new section exists then we repeat the same operation
    if (subSections.length) {
      sections[i].setDataValue('sections', subSections);
      await getSectionsData(sections[i].sections, where);
    }
  }
}

export default async function getForm({ id, softDeleted = false }: { id?: number; softDeleted?: boolean }) {
  const where = softDeleted ? { [Op.or]: [{ softDeleted: true }, { softDeleted: false }] } : { softDeleted: false };

  const forms: Form[] = await models.form.findAll({
    // If the id is not specified, the whole list of forms is returned
    where: { ...(id ? { id } : {}) },
    include: [
      {
        required: false,
        model: models.field,
        as: 'fields',
        where,
      },
      {
        required: false,
        model: models.section,
        as: 'sections',
        where,
      },
    ],
  });

  // We loop the forms for get all deep of section
  const modeledForms: Form[] = [];
  for (const form of forms) {
    if (!form.sections?.length) {
      return form;
    }
    await getSectionsData(form.sections, where);
    modeledForms.push(form);
  }

  // If the id is specified we return only one form
  if (id) {
    return modeledForms[0];
  }

  return modeledForms;
}
