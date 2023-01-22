import models from '../../models';

export default async function deleteField(id: number) {
  if (!id) {
    throw new Error('You must provide an id');
  }

  const field = await models.field.finOne({ where: { id } });

  if (!field) {
    throw new Error('The field you want to delete does not exist');
  }

  await models.field.update(
    {
      softDeleted: true,
    },
    {
      where: { id },
    }
  );
}
