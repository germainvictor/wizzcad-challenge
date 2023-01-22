export default function parseQuery({ seeDeletedElement }: { seeDeletedElement: string }) {
  const props = {
    softDeleted: seeDeletedElement && seeDeletedElement === 'true' ? true : false,
  };

  return props;
}
