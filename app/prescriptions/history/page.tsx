'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { PrescriptionCard } from '@/components/prescription-card';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { mockPrescriptions } from '@/lib/mockData';

export default function PrescriptionHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState<'all' | 'low' | 'moderate' | 'high'>('all');

  const filteredPrescriptions = mockPrescriptions.filter((p) => {
    const matchesSearch =
      p.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.hospitalName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === 'all' || p.riskLevel === filterRisk;
    return matchesSearch && matchesRisk;
  });

  return (
    <>
      <Navbar title="Prescription History" />
      <div className="flex-1 overflow-auto">
        <div className="p-8 space-y-6">
          {/* Header with Actions */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">All Prescriptions</h1>
              <p className="text-muted-foreground mt-2">
                {filteredPrescriptions.length} prescription(s) found
              </p>
            </div>
            <Button asChild>
              <Link href="/prescriptions/upload">📤 Upload New</Link>
            </Button>
          </div>

          {/* Filters */}
          <Card className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Search</label>
                <Input
                  placeholder="Search by doctor or hospital..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-border"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Filter by Risk Level</label>
                <div className="flex gap-2 flex-wrap">
                  {(['all', 'low', 'moderate', 'high'] as const).map((risk) => (
                    <button
                      key={risk}
                      onClick={() => setFilterRisk(risk)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filterRisk === risk
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {risk.charAt(0).toUpperCase() + risk.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Prescriptions List */}
          {filteredPrescriptions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrescriptions.map((prescription) => (
                <PrescriptionCard
                  key={prescription.id}
                  prescription={prescription}
                  href={`/prescriptions/${prescription.id}`}
                />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <p className="text-3xl mb-4">📋</p>
              <p className="text-lg font-semibold text-foreground">No prescriptions found</p>
              <p className="text-muted-foreground mt-2">
                {searchTerm || filterRisk !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Upload your first prescription to get started'}
              </p>
              {!searchTerm && filterRisk === 'all' && (
                <Button asChild className="mt-6">
                  <Link href="/prescriptions/upload">Upload Prescription</Link>
                </Button>
              )}
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
