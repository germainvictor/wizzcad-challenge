export interface Model {
  name: string;
  metadata: [Metadata];
}

export interface Metadata {
  type: string;
  name: string;
  subType?: string;
  required?: string;
  metadata?: [Metadata];
}

export interface Form {
  id: number;
  name: string;
  sections: Section[];
  fields: Field[];
}

export interface Section {
  id: number;
  name: string;
  sectionId: number;
  formId: number;
  fields: Field[];
  sections: Section[];
  setDataValue: (name: string, value: Section) => {};
}

export interface Field {
  id: number;
  name: string;
  type: string;
  required: boolean;
  sectionId: number;
  formId: number;
}
