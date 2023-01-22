import models from '../../models';
import { getSectionsData } from '../form/getForm';

export default async function updateSection(
  id: number,
  {
    name,
    softDeleted,
  }: {
    name: string;
    softDeleted: string;
  }
) {
  if (!name && !softDeleted) {
    throw new Error('Nothing to update');
  }

  await models.section.update(
    {
      name,
      softDeleted: softDeleted ? (softDeleted === 'true' ? true : false) : false,
    },
    {
      where: { id },
    }
  );

  const section = await models.section.findOne({
    where: { id },
    include: [
      {
        required: false,
        model: models.field,
        as: 'fields',
      },
      {
        required: false,
        model: models.section,
        as: 'sections',
      },
    ],
  });

  // And we get all the information from the section
  await getSectionsData(section.sections, {});

  return section;
}
