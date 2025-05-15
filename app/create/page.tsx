"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DatePicker from "@/components/ui/date-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

const formSchema = z
  .object({
    commitment: z.string().min(1, "please tell us what you're committing to"),
    amount: z
      .string()
      .refine(
        (val) => !isNaN(Number(val)) && Number(val) > 0,
        "amount must be greater than 0"
      ),
    token: z.enum(["ETH", "USDC"]),
    friendAddress: z.string().min(1, "please enter your friend's address"),
    deadline: z.date().min(new Date(), "deadline must be in the future"),
    claimDate: z.date(),
  })
  .refine(
    (data) => {
      return data.claimDate > data.deadline;
    },
    {
      message: "claim date must be after the deadline",
      path: ["claimDate"],
    }
  );

export default function CreatePage() {
  const [selectedToken, setSelectedToken] = useState<"ETH" | "USDC">("ETH");
  const mockBalance = {
    ETH: "1.5",
    USDC: "1000",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      commitment: "",
      amount: "",
      token: "ETH",
      friendAddress: "",
      deadline: undefined,
      claimDate: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="w-full">
      <div className="container mx-auto max-w-2xl py-10">
        <Card>
          <CardHeader>
            <CardTitle>create new commitment</CardTitle>
            <CardDescription>
              make a commitment and back it with tokens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="commitment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>what are you committing to?</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="i will ship my project by..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>stake amount</FormLabel>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0.0"
                              min="0"
                              step="0.000001"
                              {...field}
                            />
                          </FormControl>
                          <FormField
                            control={form.control}
                            name="token"
                            render={({ field }) => (
                              <Select
                                value={field.value}
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  setSelectedToken(value as "ETH" | "USDC");
                                }}
                              >
                                <SelectTrigger className="w-24">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ETH">ETH</SelectItem>
                                  <SelectItem value="USDC">USDC</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            form.setValue("amount", mockBalance[selectedToken])
                          }
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          balance: {mockBalance[selectedToken]} {selectedToken}
                        </button>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="friendAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>trusted friend&apos;s address</FormLabel>
                      <FormControl>
                        <Input placeholder="0x... or ENS" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>deadline</FormLabel>
                      <FormControl>
                        <DatePicker
                          date={field.value}
                          onSelect={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="claimDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>safety claim date</FormLabel>
                      <FormControl>
                        <DatePicker
                          date={field.value}
                          onSelect={field.onChange}
                        />
                      </FormControl>
                      <FormDescription>
                        if your friend hasn&apos;t resolved the commitment by
                        this date, you can claim your funds back
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  create commitment
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
