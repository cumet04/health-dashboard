# frozen_string_literal: true

class BodyCompositionsController < ApplicationController
  def index
    since = BodyComposition.maximum(:time)
    BodyComposition::Retriever.new.call(since: since).each(&:save)

    records = BodyComposition.ordered.limit(100)
    render json: records.map(&:to_display_hash)
  end
end
