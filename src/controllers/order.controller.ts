import { Request, Response } from "express";
import * as orderService from "../services/order.service";

export interface OrderBlock {
  LineNo: number;
}

export interface OrderItem {
  orderID: string;
  orderBlocks?: OrderBlock[];
}

function hasAnyLineNoDivisibleBy3(order: OrderItem): boolean {
  const blocks = order.orderBlocks ?? [];
  return blocks.some((b) => b.LineNo % 3 === 0);
}

export async function postOrders(req: Request, res: Response): Promise<void> {
  try {
    const { items } = req.body as { items?: OrderItem[] };
    if (!Array.isArray(items)) {
      res.status(400).json({ error: "items must be an array" });
      return;
    }

    const filtered = items.filter((order) => !hasAnyLineNoDivisibleBy3(order));
    const orderIds = filtered.map((o) => o.orderID).filter(Boolean);

    const inserted = await orderService.insertOrderIds(orderIds);
    res.status(201).json({ insertedOrderIDs: inserted });
  } catch (err) {
    console.error("postOrders error", err);
    res.status(500).json({ error: "Failed to process orders" });
  }
}

export async function postArrayPractice(req: Request, res: Response): Promise<void> {
  try {
    const { numbers } = req.body as { numbers?: number[] };
    if (!Array.isArray(numbers)) {
      res.status(400).json({ error: "numbers must be an array" });
      return;
    }

    const mapResult = numbers.map((n) => n * 2);
    const filterResult = numbers.filter((n) => n > 2);
    const reduceResult = numbers.reduce((acc, n) => acc + n, 0);
    const findResult = numbers.find((n) => n === 4);
    const someResult = numbers.some((n) => n > 4);
    const everyResult = numbers.every((n) => n >= 1);
    const flatInput = [[1, 2], [3, 4], [5]];
    const flatResult = flatInput.flat();

    res.status(200).json({
      map: mapResult,
      filter: filterResult,
      reduce: reduceResult,
      find: findResult ?? null,
      some: someResult,
      every: everyResult,
      flat: flatResult,
    });
  } catch (err) {
    console.error("postArrayPractice error", err);
    res.status(500).json({ error: "Failed to run array practice" });
  }
}
