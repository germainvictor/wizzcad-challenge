import models from '../../models';

export default async function deleteSection(id: number) {
  if (!id) {
    throw new Error('You must provide an id');
  }

  const section = await models.section.finOne({ where: { id } });

  if (!section) {
    throw new Error('The section you want to delete does not exist');
  }

  await models.section.update(
    {
      softDeleted: true,
    },
    {
      where: { id },
    }
  );
}
