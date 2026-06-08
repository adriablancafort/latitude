import type { TraceIngestionRateLimitConfig } from "./trace-ingestion.ts"

/**
 * Flat per-key ingest throughput ceiling applied to every sandbox key (Test
 * Mode). Identical for all sandboxes and independent of the parent org's plan;
 * per-plan variation is deferred. Reuses the existing per-key limiter (429 +
 * Retry-After) with these lower per-minute allowances. The 60s window mirrors
 * the production limiter so the sandbox ceiling is "per minute" too — only the
 * per-window allowances are lower. Not billed — an abuse/throughput guard only.
 */
export const SANDBOX_TRACE_INGESTION_RATE_LIMIT: TraceIngestionRateLimitConfig = {
  maxRequests: 60,
  maxBytes: 8 * 1024 * 1024,
  windowSeconds: 60,
}
