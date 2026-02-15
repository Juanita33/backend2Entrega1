import { TicketsDAO } from "../dao/mongo/tickets.dao.js";

export class TicketsRepository {
  constructor() { this.dao = new TicketsDAO(); }
  create(data) { return this.dao.create(data); }
}