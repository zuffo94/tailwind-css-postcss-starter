"use client";

import React, { useState } from "react";

interface Argument {
  id: number;
  malePoint: string;
  femalePoint: string;
  resolved: boolean | null; // null means not answered yet
}

export default function HomePage() {
  const [malePoint, setMalePoint] = useState("");
  const [femalePoint, setFemalePoint] = useState("");
  const [argumentsHistory, setArgumentsHistory] = useState<Argument[]>([]);
  const [nextId, setNextId] = useState(1);

  const addArgument = () => {
    if (malePoint.trim() === "" && femalePoint.trim() === "") return;
    const newArgument: Argument = {
      id: nextId,
      malePoint: malePoint.trim(),
      femalePoint: femalePoint.trim(),
      resolved: null,
    };
    setArgumentsHistory([newArgument, ...argumentsHistory]);
    setNextId(nextId + 1);
    setMalePoint("");
    setFemalePoint("");
  };

  const setResolvedStatus = (id: number, status: boolean) => {
    setArgumentsHistory((prev) =>
      prev.map((arg) =>
        arg.id === id ? { ...arg, resolved: status } : arg
      )
    );
  };

  return (
    <main className="max-w-3xl mx-auto p-6 flex flex-col gap-6 font-proxima-nova">
      <h1 className="text-3xl font-semibold text-center mb-4">Arguments History</h1>

      <section className="flex flex-col gap-4 bg-gray-50 p-6 rounded-xl shadow-sm">
        <label className="flex flex-col gap-1">
          <span className="font-semibold">Male's Point of View</span>
          <textarea
            className="rounded-lg border border-gray-300 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-black"
            rows={3}
            value={malePoint}
            onChange={(e) => setMalePoint(e.target.value)}
            placeholder="Write male's point of view here..."
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-semibold">Female's Point of View</span>
          <textarea
            className="rounded-lg border border-gray-300 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-black"
            rows={3}
            value={femalePoint}
            onChange={(e) => setFemalePoint(e.target.value)}
            placeholder="Write female's point of view here..."
          />
        </label>

        <button
          onClick={addArgument}
          className="self-end bg-black text-white rounded-full px-6 py-2 font-semibold hover:bg-gray-800 transition"
        >
          Add Argument
        </button>
      </section>

      <section className="flex flex-col gap-4">
        {argumentsHistory.length === 0 && (
          <p className="text-center text-gray-500">No arguments recorded yet.</p>
        )}

        {argumentsHistory.map(({ id, malePoint, femalePoint, resolved }) => (
          <div
            key={id}
            className="bg-white border border-gray-300 rounded-xl p-4 shadow-sm flex flex-col gap-3"
          >
            <div>
              <p className="font-semibold">Male's Point:</p>
              <p className="whitespace-pre-wrap">{malePoint || <em>No input</em>}</p>
            </div>
            <div>
              <p className="font-semibold">Female's Point:</p>
              <p className="whitespace-pre-wrap">{femalePoint || <em>No input</em>}</p>
            </div>

            <div className="flex items-center gap-4 mt-2">
              <span className="font-semibold">Was this discussed and resolved?</span>
              <button
                onClick={() => setResolvedStatus(id, true)}
                className={`rounded-full px-4 py-1 border ${
                  resolved === true ? "bg-black text-white" : "border-black text-black"
                } transition`}
              >
                Resolved
              </button>
              <button
                onClick={() => setResolvedStatus(id, false)}
                className={`rounded-full px-4 py-1 border ${
                  resolved === false ? "bg-black text-white" : "border-black text-black"
                } transition`}
              >
                Problem Persists
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
