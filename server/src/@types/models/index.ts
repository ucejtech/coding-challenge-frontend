export interface AgentsModelInterface {}

export interface LogsModelInterface {}

export interface ResolutionsModelInterface {}

export interface ModelInterface {
  identifier?: string;
  agentIdentifier?: string;
  number?: string;
  dateTime?: string;
  duration?: number;
  resolution?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  photo?: string;
}
